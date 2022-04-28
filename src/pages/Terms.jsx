import pageContents from "../helpers/page_contents";

export default function Terms() {
  const pageContent = pageContents.terms;
  return (
    <section className="">
      {pageContent.title && (
        <div className="app-bg-color page-title-area">
          <h1 className="page-title text-center">{pageContent.title}</h1>
          {pageContent.description && (
            <p className="text-center text-light my-0">
              {pageContent.description}
            </p>
          )}
        </div>
      )}

      {pageContent.sections && (
        <div className="container-fluid py-5 right-sec">
          <div className="container">
            
              {pageContent.sections.map((aboutSec, index) => (
                <div>
                    <h1 className="fs-5 font-righteous">{aboutSec.title}</h1>
                    <p>{aboutSec.description}</p>
                </div>
              ))}
            
          </div>
        </div>
      )}
    </section>
  );
}
