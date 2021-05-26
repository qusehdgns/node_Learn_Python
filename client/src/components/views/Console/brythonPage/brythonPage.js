import React from 'react'

import { Container } from 'react-bootstrap';

function brythonPage() {
    
    return (
        <Container fluid className='p-0' onLoad="brython()">
            <textarea id="code" className="codearea"
                style={{
                    width : '100%', height: '85vh',
                    backgroundColor: '#000', color: '#fff', overflow: 'auto',
                    resize: 'none'
                }}></textarea>
        </Container>
    )
}

export default brythonPage
