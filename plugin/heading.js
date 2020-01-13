const MyPlugin = {
    install(Vue, options) {
        // heading组件-改成函数式组件
        // <heading :level="1" :title="title" >
        // <svg class="icon"><use xlink:href="#icon-GolfCart"></use></svg>
        // {{title}}
        // </heading>
        // <h2 title=""></h2>
        Vue.component('heading', {
            functional: true,
            props: {
                level: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    default: ''
                },
                iconname: {
                    type: String
                }
            },
            render(h, context) { //上下文传参
                let children = [];
                const {
                    iconname,
                    title,
                    level
                } = context.props;
                if (iconname) {
                    children.push(h('svg', {
                        attrs: {
                            class: 'icon'
                        }
                    },
                        [h('use', {
                            attrs: {
                                'xlink:href': '#icon-' + iconname
                            },
                        })] //这里要用[]包起来，是数组
                    ));
                    children = children.concat(context.children);
                }

                //添加图标功能
                //<svg class="icon"><use xlink:href="#icon-GolfCart"></use></svg>
                const vnode = h(
                    'h' + level, //参数1：tagname
                    {
                        attrs: {
                            title
                        }
                    }, // 参数2：
                    children // 参数3：子节点VNode数组
                )
                // snabbdom
                console.log(vnode);
                // 返回createElement返回的VNode
                return vnode;
            }
        }); 
    }
}
//如果这里不写，那使用的使用要写
// if(typeof window!=='undefined' && window.Vue){
//     window.Vue.use(MyPlugin);
// }