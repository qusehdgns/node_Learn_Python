// 액션 결과를 나타내는 타입값 선언
import {
    CHECK_CHAPTERANDINDEX,
    READ_STUDYLIST
} from '../_actions/types';

function list_split_action(state = {}, action) {
    switch (action.type) {
        case CHECK_CHAPTERANDINDEX:

            return { ...state, result: action.payload };
            
        case READ_STUDYLIST:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default list_split_action;