import React, {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './App.scss';

function App() {
  const [title, setTitle] = useState('WHITE');

  const refs: RefObject<HTMLDivElement>[] = useMemo(() => [], []);

  const newRef = () => {
    const ref = createRef<HTMLDivElement>();
    refs.push(ref);
    return ref;
  };

  useEffect(() => {
    const boxObserver = new IntersectionObserver(
      (entries, _) => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            const newTitle = item.target.id.toUpperCase();
            setTitle(newTitle);
          }
        });
      },
      {
        threshold: 0.9,
      },
    );

    refs.forEach(ref => boxObserver.observe(ref.current as HTMLDivElement));
  }, [refs]);

  return (
    <>
      <h1>{title}</h1>
      <div id="white" className="white" ref={newRef()}></div>
      <div id="green" className="green" ref={newRef()}></div>
      <div id="yellow" className="yellow" ref={newRef()}></div>
    </>
  );
}

export default App;
