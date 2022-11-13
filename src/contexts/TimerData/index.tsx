import { createContext, useContext } from 'react';

interface ITimerProvider {
  children: JSX.Element;
}

interface ITimerStorage {
  startAt: number;
  data: any;
}

interface ITimer {
  isAlive: boolean;
  data?: ITimerStorage;
}

interface IUpdateTimer {
  intervalId?: number | NodeJS.Timer;
  timer: ITimerContext;
  tag: string;
  update: (seconds: number) => void;
  stop: () => void;
}

export interface ITimerContext {
  startTimer: (tag: string, data: any, callback?: () => void) => void;
  hasTimer: (tag: string) => ITimer;
  stopTimer: (tag: string) => void;
  updateTimer: ({ timer, tag, update, stop }: IUpdateTimer) => boolean;
  startUpdate: ({ timer, tag, update, stop }: IUpdateTimer) => void;
}

const TimerContext = createContext<ITimerContext>({} as ITimerContext);

const TimerProvider = ({ children }: ITimerProvider) => {
  function startTimer(tag: string, data: any, callback?: () => void): void {
    const dataStorage: ITimerStorage = {
      startAt: Math.floor(Date.now() / 1000),
      data
    }

    localStorage.setItem(tag, JSON.stringify(dataStorage));

    setTimeout(() => {
      localStorage.removeItem(tag);

      if(callback) {
        callback();
      }
    }, 30000);
  }

  function hasTimer(tag: string): ITimer {
    const json = localStorage.getItem(tag);

    if (!json) {
      return { isAlive: false };
    }

    const dataStorage = JSON.parse(json) as ITimerStorage;

    return {
      isAlive: dataStorage.startAt + 30 >= Math.floor(Date.now() / 1000) ? true : false,
      data: dataStorage
    }
  }

  function stopTimer(tag: string): void {
    localStorage.removeItem(tag);
  }

  function updateTimer({ intervalId, timer, tag, update, stop }: IUpdateTimer): boolean {
    const dataStorage = timer.hasTimer(tag);

    if (dataStorage.isAlive && dataStorage.data) {
      const seconds = dataStorage.data?.startAt + 30 - Math.floor(Date.now() / 1000);

      update(seconds);

      return true;
    } 
      
    stop();

    if (intervalId) {
      clearInterval(intervalId);
    }
    
    return false;
  }

  function startUpdate({ timer, tag, update, stop }: IUpdateTimer): void {
    const isAlive = timer.updateTimer({ timer, tag, update, stop });

    if (isAlive) {
      const intervalId = setInterval(() => timer.updateTimer({ intervalId, timer, tag, update, stop }), 1000) as NodeJS.Timer;
    }
  }

  return (
    <TimerContext.Provider value={{ startTimer, hasTimer, stopTimer, updateTimer, startUpdate }}>
      { children }
    </TimerContext.Provider>
  )
}

const useTimer = () => {
  const context = useContext(TimerContext);

  return context;
}

export { TimerContext, TimerProvider, useTimer };