<template>
    <div>
        <h1>Все записи</h1>

        <div v-if="errored"  class="alert alert-danger" role="alert">
            <strong>Записи не загрузились, попробуйте позже:(</strong>
        </div>
        <table v-else class="table table-striped">
            <div v-if="loading">Загрузка... </div>
            <thead>
                <tr>
                    <th scope="col" >ID</th>
                    <th scope="col" >Название</th>
                    <th scope="col" >Описание</th>
                    <th scope="col" ></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <th>{{ post.id }}</th>
                    <td>{{ post.title }}</td>
                    <td>{{ post.description }}</td>
                    <td>
                        <button type="button" class="btn btn-success">Редактировать</button>
                        <button type="button" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<<script>
export default {
    data(){
        return {
            posts: [],
            post: {
                id: '',
                title: '',
                description: '',
            },
            pagination: {},
            edit: false,
            loading: true,
            errored: false,
        }
    }, 
    mounted() {
        this.getPosts()
    },
    methods: {
        getPosts(page_url){
            page_url = page_url || '/api/posts'
            axios
                .get(page_url)
                .then(response => {
                    this.posts = response.data,
                    this.makePagination(response)
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true; })
                .finally(() => this.loading = false);
        },
        makePagination(response) {
            let pagination = {
                current_page: response.current_page,
                last_page: response.last_page,
                prev_page_url: response.prev_page_url,
                next_page_url: response.next_page_url,
            }

            this.pagination = pagination
            console.log(this.pagination)
        }
    },
}
</script>