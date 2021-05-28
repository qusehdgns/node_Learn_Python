// 액션 결과를 나타내는 타입값 선언
import {
    READ_QUIZ,
    SOLVE_QUIZ,
    CHECK_QUIZ
} from '../_actions/types';

function quiz_split_action(state = {}, action) {
    switch (action.type) {
        case READ_QUIZ:

            return { ...state, result: action.payload };

        case SOLVE_QUIZ:

            return { ...state, result: action.payload };

        case CHECK_QUIZ:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default quiz_split_action;