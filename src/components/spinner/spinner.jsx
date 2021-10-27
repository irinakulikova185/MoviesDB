export const Spinner = () => {
  return (
    <div className='text-center'>
      <div
        className='spinner-border'
        style={{
          width: '3rem',
          height: '3rem',
          color: 'olivedrab',
          marginTop: 70,
        }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
