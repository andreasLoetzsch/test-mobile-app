import { authQueries } from "./authQueries"
import { todoQueries } from "./todoQueries"

export const queries = {
    ...authQueries,
    ...todoQueries,
}