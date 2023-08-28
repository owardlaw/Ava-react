import React, { useState, useRef } from 'react';
import "./EditableDiv.css"
import { AiFillThunderbolt } from "react-icons/ai";

function EditableDiv() {
    const [content, setContent] = useState('');
    const divRef = useRef(null);

    const handleFocus = () => {
        if (!content.trim()) {
            setContent('');
        }
    }

    const handleBlur = () => {
        if (!content.trim()) {
            setContent('');
        }
    }

    const handleInput = () => {
        setContent(divRef.current.textContent);
    }

    function clear() {
        console.log(content);
        setContent('');
        divRef.current.textContent = '';
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            clear()
        }
    }

    return (
        <div className='message-container'>
            <div
                ref={divRef}
                className={`input-div ${!content.trim() && 'empty'}`}
                contentEditable={true}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                data-placeholder='Write a message here...'
            ></div>

            <button onClick={clear} >
                <AiFillThunderbolt size={20} />
            </button>

        </div>
    );
}

export default EditableDiv;