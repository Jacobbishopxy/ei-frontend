/**
 * Created by Jacob Xie on 8/7/2020.
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';


interface RefObject {
  sayHi: () => void
}

export const Child = forwardRef((props: { name: string }, ref: React.Ref<RefObject>) => {

  const {name} = props;

  const sayHi = () => console.log(`Saying hello from: ${name}`)

  useImperativeHandle(ref, () => ({sayHi}));

  return <div>{name}</div>
});


export const Parent = () => {

  const childRef = useRef<RefObject>(null);

  const onClick = () => {
    if (childRef.current) childRef.current.sayHi();
  }

  return (
    <div onClick={onClick}>
      <Child name="Jacob" ref={childRef}/>
    </div>
  );
};

export default Parent;

