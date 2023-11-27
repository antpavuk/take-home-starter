import { FC, HTMLProps } from 'react';

interface CustomButtonProps extends HTMLProps<HTMLButtonElement> {}

const CustomButton: FC<CustomButtonProps> = ({ className, type, children, ...rest }) => {
  const defaultClassName = 'px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 mt-2';

  const buttonClasses = className ? `${defaultClassName} ${className}` : defaultClassName;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
