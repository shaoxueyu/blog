import progress from "nprogress"
import "nprogress/nprogress.css"
import router from "../router"

router.beforeEach((to,from,next) => {
  console.log(to);
  progress.start()
  next()
})
router.afterEach((to,from) => {
  progress.done()
})