import { useAtomValue } from 'jotai'
import { toggleAtom } from '../../store/Layout/Layout'

const GlobalFilterContainer = ({ children }) => {
  const exFilterToggle = useAtomValue(toggleAtom)

  return exFilterToggle && <>{children}</>
}

export default GlobalFilterContainer
