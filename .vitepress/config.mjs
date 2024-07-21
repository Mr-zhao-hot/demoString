import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/demoString/",
  title: "学习目标",
  description: "study",
  themeConfig: {
    sidebar: false, // 关闭侧边栏
aside: "left", // 设置右侧侧边栏在左侧显示
    // 右边侧边栏
    outlineTitle:"文章目录",
    outline:[2,6],
    // 配置搜索
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "计算机基础", 
        items: [
          { text: "计算机组成", link: "/computer/composition" },
          { text: "HTTP协议", link: "/base/htp.md" },
          { text: "会话控制", link: "/base/talk.md" },
          { text: "TCP/IP", link: "/computer/tcp-ip" },
          { text: "方法理论", link: "/base/io.md" }
        ]
      },
      {
        text: "后端", 
        items: [
          { text: "Python", link: "/back/python.md" },
          { text: "Java", link: "/back/java" },
          { text: "Django", link: "/back/django.md" },
          { text: "Spring", link: "/back/spring" },
          { text: "Java Web", link: "/back/javaweb" },
          { text: "Spring Boot", link: "/back/springboot" },
        ]
      },
      {
        text: "前端", 
        items: [
          { text: "Vue", link: "/frontend/vue" },
          { text: "React", link: "/frontend/react" },
          { text: "CSS", link: "/front/css.md" },
          { text: "HTML5", link: "/frontend/html5" },
          { text: "JavaScript", link: "/frontend/javascript" },
          { text: "Node.js", link: "/frontend/nodejs" },
          { text: "Jquery", link: "/front/Jquery.md" },
          { text: "es6", link: "/front/es6.md" },
        ]
      },
      {
        text: "测试", 
        items: [
          { text: "测试说明", link: "/testing/introduction" },
          { text: "自动化测试(Python)", link: "/test/python.md" },
          { text: "自动化测试(Java)", link: "/testing/automation-java" },
          { text: "接口测试", link: "/testing/api-testing" },
          { text: "性能测试", link: "/testing/performance-testing" },
          { text: "功能测试", link: "/testing/functional-testing" },
          { text: "单元测试", link: "/test/fist.md" },
        ]
      },
      {
        text: "运维", 
        items: [
          { text: "Linux", link: "/server/Linux.md" },
        ]
      },
      {
        text: "数据库", 
        items: [
          { text: "MySQL", link: "/num/mysql" },
          { text: "Redis", link: "/num/redis" }
        ]
      },
      {
        text: "UI设计师", 
        items: [
          { text: "Axure", link: "/database/mysql" },
        ]
      },
      {text:"高考分数调查",
        items:[
          {text:"2024年",link:"/testing/functional-testing"}
        ]
      },
      {text:"道具使用说明",
      items:[
        {text:"Typore使用说明",link:"/tool/typore.md"}
        ]
      },

    ],

    // sidebar: { "/python": set_sidebar("/python") },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    footer: {
      copyright: "如果需要帮助请联系我 mr_zhao20192@163.com",
    },
  }
})