import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        book: null,
    },
    mutations: {
        setBook(state, book) {
            state.book = book;
        },
    },
    actions: {
        setBook(context, book) {
            context.commit('setBook', book);
        },
    },
    getters: {
        book(state) {
            return state.book;
        },
    },
});
