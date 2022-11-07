export const AlertType = {
  error: "danger",
  info: "info",
  success: "success"
}

export interface AlertProps {
  type?: string;
  message?: string;
}

export function Alert({ type, message }: AlertProps) {
  return (
    <>
      { message ? (
        <div className={`alert alert-${type ? type : "danger"}`} role = "alert" > { message }</div>
      ) : null }
    </>
  )
}