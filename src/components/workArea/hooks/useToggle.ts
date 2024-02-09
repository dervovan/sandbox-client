import { useState } from 'react'

const useToggle = (
  defVal: boolean
): { toggle: boolean; onToggle: () => void } => {
  const [toggle, setToggle] = useState<boolean>(defVal)

  const onToggle = () => {
    setToggle(!toggle)
  }

  return {
    toggle,
    onToggle,
  }
}

export default useToggle