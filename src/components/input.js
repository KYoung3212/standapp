import React from 'react';

export default ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="row">
            <div className="container">
                <label>{label}</label>
                <input {...input} type={type||'text'}/>
                <p className="text-danger">{touched && error}</p>
            </div>
        </div>
    )
}