import shape_creator as s


def main():
    """
    this is the functions where i'll call all the methods from the Shape Class
    """

    sphere = s.Sphere(individual_face_shape="square")
    sphere.create_obj(points=points, faces=faces, file_name=file_name)


if __name__ == "main":
    main()
