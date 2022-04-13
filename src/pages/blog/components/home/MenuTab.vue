<template>
    <div class="btn-group">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" >{{username}}</button>
        <ul class="dropdown-menu">
            <li> 
                <a class="dropdown-item" 
                    v-for="(item, index) in menus"
                    :key="index" 
                    @click="didSelectItem(index)"
                    href="#"
                    >
                    {{item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "user-menu",
        data() {
            return {
                username: "wenchihchang",
                menus: [{
                    name: "个人中心",
                    class: ""
                },{
                    name: "账号设置",
                    class: ""
                },{
                    name: "退出",
                    class: ""
                }
                ],
            }
        },
        methods: {
            didSelectItem(index) {
                this.$emit('select-menu', index);
            }
        }
    }
</script>