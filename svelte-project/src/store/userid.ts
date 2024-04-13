import { writable } from 'svelte/store';
function createUserId() {
    const { subscribe, set } = writable(0);

    return {
        subscribe,
        set: (id: number) => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('userId', id.toString());
            }
            set(id);
        },
        load: () => {
            if (typeof localStorage !== 'undefined') {
                const id = localStorage.getItem('userId');
                if (id) {
                    set(parseInt(id));
                }
            }
        }
    };
}

export const userId = createUserId();