import React, { useState } from 'react'

function StudyListPage() {

    const [StudyList, setStudyList] = useState(null);

    return (
        <div style={{ height: '100%', width: '300px', borderRight: '1px solid rgba(0,0,0,.3)', overflowY: 'auto' }}>
            <ol>
                <li>Chapter01</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter02</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter03</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter04</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter05</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter06</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
                <li>Chapter07</li>
                <ul>
                    <li>temp1</li>
                    <li>temp2</li>
                    <li>temp3</li>
                </ul>
            </ol>
        </div >
    )
}

export default StudyListPage
