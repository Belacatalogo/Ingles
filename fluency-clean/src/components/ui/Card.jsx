export function Card({ eyebrow, title, children, action }) {
  return (
    <article className="card">
      <div className="card-heading">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2>{title}</h2> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children ? <div className="card-body">{children}</div> : null}
    </article>
  );
}
