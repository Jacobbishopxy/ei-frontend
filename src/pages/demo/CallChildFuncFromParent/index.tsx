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

interface ChildGeneratorProps {
  greeting: string
  forwardedRef: React.Ref<RefObject>
}

interface ChildProps {
  name: string
}


const childGenerator = (cgProps: ChildGeneratorProps) => {

  return forwardRef((frProps: ChildProps, ref: React.Ref<RefObject>) => {

    const {name} = frProps;

    const sayHi = () => console.log(`Saying hello from: ${name}`)

    useImperativeHandle(ref, () => ({sayHi}));

    return <div>{cgProps.greeting} {name}</div>
  });
};


const childSwitcher = (name: string, switcher: string) => (props: ChildGeneratorProps) => {

  const Child1 =
    childGenerator({greeting: `Child #1: ${props.greeting}`, forwardedRef: props.forwardedRef});
  const Child2 =
    childGenerator({greeting: `Child #2: ${props.greeting}`, forwardedRef: props.forwardedRef});


  switch (switcher) {
    case '1':
      return <Child1 name={name} ref={props.forwardedRef}/>;
    case '2':
      return <Child2 name={name} ref={props.forwardedRef}/>;
    default:
      return <Child1 name={name} ref={props.forwardedRef}/>;
  }
}


const Parent = () => {

  const childRef = useRef<RefObject>(null);

  const onClick = () => {
    if (childRef.current) childRef.current.sayHi();
  }

  const s = childSwitcher('Jacob', '2')

  return (
    <div onClick={onClick}>
      {
        s({greeting: 'Hi', forwardedRef: childRef})
      }
    </div>
  );
};

export default Parent;

