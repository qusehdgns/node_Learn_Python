// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    READ_STUDY
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { STUDY_SERVER } from '../components/Config';

export function readStudy(dataTosubmit) {

    const req = Axios.get(`${STUDY_SERVER}`, {
        params : dataTosubmit
    }).then(res => res.data);

    return {
        type: READ_STUDY,
        payload: req
    }
}