// 리엑트 기본 라이브러리 호출
import React from 'react';

import { useSelector } from 'react-redux'

// image
import sampleImg from '../../../utils/image/sample_img.png'

//bootstrap
import { Container, Row, Col } from 'react-bootstrap'

// 기본 url 호출 시 실행되는 페이지 정보
function MyPage() {

    let userName = null;
    let userPhone = null;
    let userRole = null;

    const state = useSelector(state => state.user);


    if (state.hasOwnProperty('userData')) {
        userName = <h6>{state.userData.name}</h6>;
        userPhone = <h6>{state.userData.phone}</h6>;

        if(state.userData.role === 0){
            userRole = <h6>Admin</h6>;
        } else if(state.userData.role === 2){
            userRole = <h6>WikiUser</h6>;
        } else {
            userRole = <h6>User</h6>;
        }
    }

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100%', flexDirection: 'column'
        }}>
            <div style={{ width: '80%', height: '35%', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={6} className="text-center">
                            <img width={150} height={150} src={sampleImg} />
                        </Col>
                        <Col xs={12} sm={6} style={{display: 'flex', flexDirection: 'column', justifyContent:'center'}} className="px-5">
                            { userName }
                            { userPhone }
                            { userRole }
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ width: '100%', height: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ border: '1px solid rgba(0,0,0,.7)', width: '38%', height: '100%', margin: '0 2%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <h2>Classes and User Rank</h2>
                </div>
                <div style={{ border: '1px solid rgba(0,0,0,.7)', width: '38%', height: '100%', margin: '0 2%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <h2>User Rating about Quiz</h2>
                </div>
            </div>
        </div>
    )
}

export default MyPage
