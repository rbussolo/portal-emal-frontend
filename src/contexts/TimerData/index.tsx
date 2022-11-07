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

export interface ITimerContext {
  startTimer: (tag: string, data: any, callback?: () => void) => void;
  hasTimer: (tag: string) => ITimer;
  stopTimer: (tag: string) => void;
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

  return (
    <TimerContext.Provider value={{ startTimer, hasTimer, stopTimer }}>
      { children }
    </TimerContext.Provider>
  )
}

const useTimer = () => {
  const context = useContext(TimerContext);

  return context;
}

export { TimerContext, TimerProvider, useTimer };