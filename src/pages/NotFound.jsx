import useState from 'react';
import { useAtom } from 'jotai';
import { headerAtom, accordionAtom } from '../store/Layout/Layout';

const NotFound = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  setShowHeader(false);
  setShowAccordion(false);
  return <div>Not Found Page!</div>;
};

export default NotFound;
