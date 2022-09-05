import interviewTable from '../data/interview.json';
import './Interview.scss';

type interviewType = {
    title: String;
    updateTime?: String;
};

const Interview: React.FC = function () {
    return (
        <div className="interview">
            {interviewTable.map((item: interviewType) => {
                return (
                    <div className="interview-item">
                        <div className="interview-item__title">
                            {item.title}
                        </div>
                        <div className="interview-item__time">
                            {item?.updateTime}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Interview;
