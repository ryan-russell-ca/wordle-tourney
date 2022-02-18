import { FunctionComponent, HTMLProps } from 'react';

const QuestionMark: FunctionComponent = ({ className }: HTMLProps<HTMLDivElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="92"
      height="92"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 92 92"
      xmlSpace="preserve"
      className={className}
    >
      <path d="M60.9 25.5c3.2 3.6 4.7 8.5 4 13.7-1.2 9.6-8.2 13-14.4 13H50v2.4c0 2.2-1.8 4-4 4s-4-1.8-4-4v-3.2c0-3.3 1.4-7.2 8.5-7.2 3.9 0 5.9-2 6.4-6 .2-1.3.3-4.8-2.1-7.4-1.9-2.1-5-3.2-9.2-3.2-9 0-9.3 5.9-9.3 6.5 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-4 3.1-14.5 17.3-14.5 8.3 0 12.9 3.2 15.3 5.9zM45.7 62c-1.3 0-2.6.5-3.5 1.5-.9.9-1.5 2.2-1.5 3.5 0 1.3.5 2.6 1.5 3.5.9.9 2.2 1.5 3.5 1.5 1.3 0 2.6-.5 3.5-1.5.9-.9 1.5-2.2 1.5-3.5 0-1.3-.5-2.6-1.5-3.5-.9-.9-2.1-1.5-3.5-1.5zM92 46c0 25.4-20.6 46-46 46S0 71.4 0 46 20.6 0 46 0s46 20.6 46 46zm-8 0C84 25 67 8 46 8S8 25 8 46s17 38 38 38 38-17 38-38z"></path>
    </svg>
  );
};

export default QuestionMark;
