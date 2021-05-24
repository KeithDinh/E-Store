class ProductFilters {
  constructor(res, Model) {
    this.res = res;
    this.Product = Model;
  }
  async handleQuery(query) {
    if (query != "") {
      const products = await this.Product.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();
      this.res.json(products);
    } else this.res.json(await this.Product.find({}));
  }

  async handlePrice(price) {
    try {
      let products = await this.Product.find({
        price: {
          $gte: price[0],
          $lte: price[1],
        },
      })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

      this.res.json(products);
    } catch (error) {
      console.log(error);
    }
  }

  async handleCategory(category) {
    try {
      let products = await this.Product.find({ category })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();
      this.res.json(products);
    } catch (error) {
      console.log(error);
    }
  }

  async handleRating(stars) {
    await this.Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: { $avg: "$ratings.star" },
          },
        },
      },
      {
        $match: { floorAverage: stars },
      },
    ])
      .limit(12)
      .exec((err, aggregates) => {
        if (err) console.log("AGGREGATE ERROR", err);

        this.Product.find({ _id: aggregates })
          .populate("category", "_id name")
          .populate("subs", "_id name")
          .populate("postedBy", "_id name")
          .exec((err, products) => {
            if (err) console.log("AGGREGATE ERROR", err);
            this.res.json(products);
          });
      });
  }

  async handleShipping(shipping) {
    const products = await this.Product.find({ shipping })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name");
    this.res.json(products);
  }
  async handleColor(color) {
    const products = await this.Product.find({ color })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name");
    this.res.json(products);
  }
  async handleBrand(brand) {
    const products = await this.Product.find({ brand })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name");
    this.res.json(products);
  }
}

module.exports = ProductFilters;
