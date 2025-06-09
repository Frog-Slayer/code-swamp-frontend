interface ArticleTitleViewProps { 
    title: string
    className?: string
}

const ArticleTitleView = ({ title, className } : ArticleTitleViewProps) => {
    return ( 
        <div className={className}> 
            {title}
        </div>
    )
}

export default ArticleTitleView