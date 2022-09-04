function ProductItem(props: any) {
  const { product } = props;
  const { image, name, description, soldCount, cost, currency } = product;
  const { html_name, html_description } = product;
  const textTitle = `${html_name ? html_name : name} - ${currency} ${cost}`;
  const textDescription = html_description ? html_description : description;

  return (
    <div className="list-group-item list-group-item-action">
      <div className="row">
        <div className="col-3">
          <img alt="product_image" src={'/' + image} className="img-thumbnail" />
        </div>
        <div className="col">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1">
              <h4 dangerouslySetInnerHTML={{ __html: textTitle.replace(/\n/g, '<br />') }}></h4>
              <p dangerouslySetInnerHTML={{ __html: textDescription.replace(/\n/g, '<br />') }}></p>
            </div>
            <small className="text-muted">{soldCount} vendidos</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;