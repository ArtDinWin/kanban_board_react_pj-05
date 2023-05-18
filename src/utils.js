import { LIST_COLORS } from "./config";
import {
  FaHourglassHalf,
  FaHandPointUp,
  FaPlayCircle,
  FaFlagCheckered,
  FaRegEdit,
  FaBell,
} from "react-icons/fa";

const getColor = (status) =>
  status === "backlog"
    ? LIST_COLORS.backlog
    : status === "ready"
    ? LIST_COLORS.inProgress
    : status === "inProgress"
    ? LIST_COLORS.ready
    : status === "finished"
    ? LIST_COLORS.finished
    : null;

const getIcon = (type) =>
  type === "backlog" ? (
    <FaHourglassHalf />
  ) : type === "ready" ? (
    <FaBell />
  ) : type === "inProgress" ? (
    <FaPlayCircle />
  ) : type === "finished" ? (
    <FaFlagCheckered />
  ) : type === "edit" ? (
    <FaRegEdit />
  ) : type === "bell" ? (
    <FaHandPointUp />
  ) : null;

export { getColor, getIcon };
