import useState from 'react';
import { useAtom } from 'jotai';
import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from '../store/Layout/Layout';

const NotFound = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom);
  setShowHeader(false);
  setShowAccordion(false);
  setShowSubHeader(false);
  return <div>Not Found Page!</div>;
};

export default NotFound;
