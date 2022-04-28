import { Link } from "react-router-dom";
import pageContents from "../helpers/page_contents";

export default function UseCases() {
  const pageContent = pageContents.usecases;
  return (
    <section className="">
      {/* {pageContent.title && (
        <div className="app-bg-color page-title-area">
          <h1 className="page-title text-center">{pageContent.title}</h1>
          {pageContent.description && (
            <p className="text-center text-light my-0">
              {pageContent.description}
            </p>
          )}
        </div>
      )} */}
      {pageContent.sections &&
        pageContent.sections.map((aboutSec, index) => (
          <div
            className={
              index % 2 == 0
                ? "contsiner-fluid left-sec"
                : "container-fluid right-sec"
            }
          >
            <div className="container">
              <div className="row align-items-center">
                {aboutSec.banner && (
                  <div
                    className={
                      index % 2 == 0
                        ? "col-md order-last"
                        : "col-md order-first"
                    }
                  >
                    <img src={aboutSec.banner} />
                  </div>
                )}
                {aboutSec.descriptions && (
                  <div
                    className={
                      index % 2 == 0
                        ? "col-md order-first"
                        : "col-md order-last"
                    }
                  >
                    {aboutSec.descriptions.map((desc) => (
                      <div className="mb-2">
                        {desc.title && (
                          <h1 className="my-0 font-righteous mb-2">
                            {desc.title}
                          </h1>
                        )}
                        {desc.subtitle && (
                          <h5 className="my-0 font-righteous mb-2">
                            {desc.subtitle}
                          </h5>
                        )}
                        {desc.description && (
                          <p className="my-0 app-para">{desc.description}</p>
                        )}
                        {desc.subSections &&
                          desc.subSections.map((sSec) => (
                            <>
                              <h5 className="my-0 font-righteous mb-0">
                                {sSec.title}
                              </h5>
                              <p className="app-para">
                                {sSec.description}{sSec.readMore && <a className="btn-link ms-2" href={sSec.readMore.link} target="_blank" rel="noreferrer">Read more...</a>}
                              </p>
                            </>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
