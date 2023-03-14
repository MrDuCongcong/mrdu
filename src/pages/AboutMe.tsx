import './AboutMe.scss';

const AboutMe: React.FC = function () {
    return (
        <div className="about-me">
            <span>你好！欢迎来到我的博客。</span>
            <span>我是杜聪聪，一个前端开发工程师。</span>
            <span>
                如果你在我的博客中发现什么错误之处，
                或者对我的代码有什么疑问之处， 可以通过下面的方式联系我。
            </span>
            <div>
                <span>ducongcong1996@163.com</span>
            </div>
        </div>
    );
};

export default AboutMe;
