# vuex-orm-benchmark

This is a continuation of my [Medium Post](https://medium.com/@gdbate/structuring-vuex-modules-for-relationships-speed-and-durability-de25f7403643) on how I structure Vuex Modules. I had a lot of people suggest I use Vuex ORM after reading it, but Vuex ORM is what I tried first.

## History

I wanted to benchmark [Vuex ORM](https://vuex-orm.github.io/vuex-orm/) because when I was testing it for a work project I found it too slow to use. I do data visualization and manipulation where the modifications produce a lot of cascading changes, affecting a lot of records. I also "reload" the data a lot to bring it back to where it started. Vuex ORM is picking up a lot of steam and I want to see if it is a good solution given it's popularity.

Check out the full record here.

## Project setup

#### Install Dependencies
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```
