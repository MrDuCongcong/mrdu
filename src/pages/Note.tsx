import { type } from 'os';
import noteTable from '../data/note.json';
import './Note.scss';

type noteType = {
    title: String;
    children?: Array<noteType>;
    updateTime?: String;
};

const Note: React.FC = function () {
    const content = noteTable.map((kind: noteType) => (
        <div className="note-kind">
            <span className="note-kind__title">{kind.title}</span>
            <div className="note-kind__block">
                {kind.children &&
                    kind.children.map((tech: noteType) => (
                        <div className="note-tech">
                            <span className="note-tech__title">
                                {tech.title}
                            </span>
                            <div className="note-tech__block">
                                {tech.children &&
                                    tech.children.map((content: noteType) => (
                                        <div className="tech-title">
                                            {content.title}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    ));

    return <div className="note">{content}</div>;
};

export default Note;
