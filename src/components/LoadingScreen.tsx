import loding from '../assets/loading animation.gif'
export default function LoadingScreen() {
  return (
    <div className='modal-blur-overlay'>
      <img src={loding} alt="loading" style={{width:"100%",height:"100vh",objectFit:"contain"}} />
    </div>
  )
}
