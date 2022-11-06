interface AlertErrorProps {
  message?: string;
}

export function AlertError({ message }: AlertErrorProps) {
  return (
    <>
      { message ? (
        <div className = "alert alert-danger" role = "alert" > { message }</div>
      ) : null }
    </>
  )
}