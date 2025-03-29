export default function LoadingScreen({ message = 'Redirecting to Virtual Tour...' }) {
    return (
      <div>
        <p>{message}</p>
        <div>Loading...</div>
      </div>
    )
  }