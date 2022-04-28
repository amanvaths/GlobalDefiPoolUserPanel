import pageContents from "../helpers/page_contents";

export default function Services() {
  const pageContent = pageContents.services;
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
        <div className="container-fluid right-sec">
          <div class="container py-5">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
              {pageContent.sections.map((aboutSec, index) => (
                <div class="col my-2">
                  <div className="card card-body text-center rounded h-100 rounded-card shadow border-0">
                    <div class="col hovicon effect-8">
                      <i class={aboutSec.banner}></i>
                    </div>
                    <h5 className="card-title fw-bold">{aboutSec.title}</h5>
                    <p className="card-text">{aboutSec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
