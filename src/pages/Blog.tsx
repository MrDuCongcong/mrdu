import BlogTable from '../data/blog.json';
import './Blog.scss';

type blogType = {
    title: String;
    updateTime?: String;
};

const Blog: React.FC = function () {
    return (
        <div className="blog">
            {BlogTable.map((item: blogType) => {
                return (
                    <div className="blog-item">
                        <div className="blog-item__title">{item.title}</div>
                        <div className="blog-item__time">
                            {item?.updateTime}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Blog;
