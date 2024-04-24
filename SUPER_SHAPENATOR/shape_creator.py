from sympy import symbols, Eq, solve, evaluate

class Shape:
    """
    This class will be responsible for creating and modifying .OBJ files
    """

    def __init__(self, shape, individual_face_shape) -> None:

        self.shape: str = shape

        #The indicidual face shapes avaliable will be squarea and triangle
        self.individual_face_shape: str = individual_face_shape

        #This should be defined as a sympy equation
        self.equation = None

        # the resolution is defined as a ratio of (points / surface area of the smooth algebric curve)
        self.resolution: float | None = None

        x, y, z, r = symbols('x, y, z, r')

        match self.individual_face_shape:

            case 'triangle':
                ...
            case 'square':
                ...
        
        if self.resolution == None:
            """
            I have to define the standard resolution as a value that will not give me problems with the calculation of 
            the object points and faces.

            I still don't know the rigth number, but i'll set it as one by now
            """
            
            standard_resolution: float = 1
            self.resolution = standard_resolution
        
        create_obj(self)

    def create_points(self) -> None:
        """
        This method will create all of the points using the equation of the curve, defined in the __init_ method
        """

    def create_faces(self) -> None:
        """
        This method will create all of the faces
        """

    def create_obj(self, points, faces, file_name) -> None:
        """
        This method is responsiblee for reading and manipulating the OBJ file
        """

        create_points()
        create_faces()

        with open(file_name, "w") as f:
            for vertice in points:
                f.write(f"v {vertice[0]} {vertice[1]} {vertice[2]}\n")

        for face in faces:
            f.write("f")
            for vertice_id in face:
                f.write(f" {vertice_id}")
            f.write("\n")

    def preview(self):
        """
        This method should be used to preview the 3D object created.

        The first idea was to open a 3D graph using matplotlib, but this is optional, and will be an
        optional feature
        """

class Sphere(Shape):
    def __init__(self, individual_face_shape):
        x, y, z, r = symbols('x, y, z, r')
        self.equation = Eq((x**2)+(y**2)+(z**2),r**2)
    

class ParabolicElipsoyd(Shape):
    def __init__(self):
        x, y, z, r, a, b, c = symbols('x, y, z, r, a, b, c')
        self.equation = Eq(c*z,a*(x**2)+b*(y**2))

class Cube(Shape):
    def __init__(self):

        x, y, z, r = symbols('x, y, z, r')

        """
        this list will store the algebric equations of the planes of the cube.

        It should contain 6 equations
        """
        self.equation: list[Eq] = [Eq(,), Eq(,)]


class Cone(Shape):
    def __init__(self, heigth, base_radius):

        x, y, z, r, h = symbols('x, y, z, r')


        """
        In this case, the first equation must be the equation of the cone, and the second must be the equation of the
        plane that cuts the cone, so that the two surfaces combined forms a closed volume surface
        
        The radius must be the radius of the base (r)

        there should be a variablee to set the heigth of the cone (h)

        Those two, heigth and radius of the base should be passed by the user so that the shape is created
        """

        self.equation: list[Eq] = [Eq(,), Eq(,)]


class Prism(Shape):
    def __init__(self):

        x, y, z, r = symbols('x, y, z, r')

        """
        This form should recieve twwo equations.

        The first one should be the equation of the shape in a 2D plane,

        Than, i don't know how to do this, but the 2D shape must be 'extruded' on some axis (like z, x or y)
        so that the 3D shaoe is created
        """
        self.equation = Eq(,)