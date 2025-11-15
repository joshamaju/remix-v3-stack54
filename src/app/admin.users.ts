import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./models/users";
import { getCurrentUser } from "./utils/context";
import { render } from "./utils/render";

export default {
  index() {
    let user = getCurrentUser();
    let users = getAllUsers();
    return render("admin/users", { user, users });
  },

  show({ params }) {
    let targetUser = getUserById(params.userId);

    if (!targetUser) {
      return render("admin/users/notfound", {}, { status: 404 });
    }

    return render("admin/users/show", { targetUser });
  },

  edit({ params }) {
    let targetUser = getUserById(params.userId);

    if (!targetUser) {
      return render("admin/users/notfound", {}, { status: 404 });
    }

    return render("admin/users/edit", { targetUser });
  },

  async update({ formData, params }) {
    updateUser(params.userId, {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      role: (formData.get("role")?.toString() ?? "customer") as
        | "customer"
        | "admin",
    });

    return redirect(routes.admin.users.index.href());
  },

  destroy({ params }) {
    deleteUser(params.userId);

    return redirect(routes.admin.users.index.href());
  },
} satisfies RouteHandlers<typeof routes.admin.users>;
