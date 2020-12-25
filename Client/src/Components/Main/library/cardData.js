import React from 'react'

function CardData(props) {
    return (
      <div className="container-showtable">
        <div className="row row-border">
          <div className="col-6">
              <div className="badge-showtable"></div>
              <p className="text-show-name">SUMMARY</p>
          </div>
          <div className="col-6 text-show-value">{props.summary}</div>
        </div>
        <div className="row row-border">
          <div className="col-6">
              <div className="badge-showtable"></div>
              <p className="text-show-name">PHASE 1</p>
          </div>
          <div className="col-6 text-show-value">{props.phase1}</div>
        </div>
        <div className="row row-border">
          <div className="col-6">
              <div className="badge-showtable"></div>
              <p className="text-show-name">PHASE 2</p>
          </div>
          <div className="col-6 text-show-value">{props.phase2}</div>
        </div>
        <div className="row row-border">
          <div className="col-6">
              <div className="badge-showtable"></div>
              <p className="text-show-name">PHASE 3</p>
          </div>
          <div className="col-6 text-show-value">{props.phase3}</div>
        </div>
      </div>
    );
}

export default CardData
