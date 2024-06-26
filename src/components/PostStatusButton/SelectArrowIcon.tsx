function SelectArrowIcon({ fill }: { fill: string }) {
  return (
    <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.28033 0.21967C9.57322 0.512563 9.57322 0.987437 9.28033 1.28033L5.28033 5.28033C4.98744 5.57322 4.51256 5.57322 4.21967 5.28033L0.21967 1.28033C-0.0732233 0.987437 -0.0732233 0.512564 0.21967 0.21967C0.512563 -0.073223 0.987437 -0.073223 1.28033 0.21967L4.75 3.68934L8.21967 0.21967C8.51256 -0.0732233 8.98744 -0.0732233 9.28033 0.21967Z'
        fill={fill}
      />
    </svg>
  );
}

export default SelectArrowIcon;
