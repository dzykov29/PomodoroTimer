import React from 'react';

const MyBtn = ({ children, time, handleStart }) => {

    return (
        <button style={{margin:10}} onClick={() => handleStart(Number(time))}>
            {children}
        </button>
    );
};

export default MyBtn;