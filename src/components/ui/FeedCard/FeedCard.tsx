import styles from "./FeedCard.module.css"

interface FeedCardProps {
    thumbnailUrl: string,
    title: string,
    summary: string,
    authorAvatar: string,
    authorName: string,
    date: string,
    onClick: () => void;
}

const FeedCard = ({ thumbnailUrl, title, summary, authorAvatar, authorName, date, onClick}: FeedCardProps) => {
    return (
        <div className={styles.card} onClick={onClick}>
        <img src={thumbnailUrl} alt="thumbnail" className={styles.thumbnail} />
  
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.author}>
            <img src={authorAvatar} alt={authorName} className={styles.authorAvatar}/>
            <span className={styles.authorName}>{authorName}</span>
          </div>
          <p className={styles.preview}>{summary}</p>
        </div>
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
          </div>

      </div>
    );
};

export default FeedCard;
