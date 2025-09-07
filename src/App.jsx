import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BMICalculator from './Pages/BMICalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-screen h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-auto">
      <BMICalculator />
    </div>
  )
}

export default App
