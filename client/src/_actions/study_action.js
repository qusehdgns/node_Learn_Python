// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    CHECK_CHAPTERANDINDEX
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { CHAPTERANDINDEX_SERVER } from '../components/Config';

export function checkChapterandIndex() {

    const req = Axios.get(`${CHAPTERANDINDEX_SERVER}`)
        .then(res => res.data);

    return {
        type: CHECK_CHAPTERANDINDEX,
        payload: req
    }
}